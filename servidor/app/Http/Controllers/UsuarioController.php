<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use Illuminate\Support\Facades\DB;
use App\Usuario;

class UsuarioController extends Controller
{
    //
    public function register(Request $request){
        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){
            //Obtener Usuario Loguedo
            $user = $jwtAuth->checkToken($hash, true);
            // Recoger POST
            $json = $request->input('json', null);
            $params = json_decode($json);
            $params_array = json_decode($json, true);
            //validacion
            $validatedData = \Validator::make($params_array, [
                'Nombre' => 'required',
                'Usuario' => 'required',
                'Correo' => 'required',
                'Password' => 'required',
                'IsActivo' => 'required'
            ]);
            if($validatedData->fails()) {
                return response()->json($validatedData->errors(), 400);
            }
            //Crear el usuario
            $usuario = new Usuario();
            $usuario->Nombre = $params->Nombre;
            $usuario->Usuario = $params->Usuario;
            $usuario->Correo = $params->Correo;
            $usuario->IsActivo = $params->IsActivo;
            $pwd = hash('sha256', $params->Password);
            $usuario->Password = $pwd;
            //Comprobar usuario duplicado
            $isset_user = Usuario::where('Usuario', '=', $params->Usuario)->first();

            if(!$isset_user){
                $usuario->save();
                $data = array(
                    'usuario' => $isset_user,
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'Usuario registrado correctamente'
                );
            }
            else{
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'Usuario Duplicado'
                );
            }


            return response()->json($data, 200);


        }else{
            $data = array(
                'status' => 'error',
                'code' => 400,
                'message' => 'Usuario no autorizado!'
            );
            return response()->json($data, 200);
        }
    }

    public function login(Request $request)
    {
        $jwtAuth = new JwtAuth();

        //Recibir Datos
        $json = $request->input('json', null);
        $params= json_decode($json);

        $usuario = (!is_null($json) && isset($params->Usuario)) ? $params->Usuario : null;
        $password = (!is_null($json) && isset($params->Password)) ? $params->Password : null;
        $getToken = (!is_null($json) && isset($params->gettoken)) ? $params->gettoken : null;

        $pwd = hash('sha256', $password);


        if(!is_null($usuario) && !is_null($password) && ($getToken == null || $getToken == 'false')){
            $signup = $jwtAuth->signup($usuario, $pwd);
        }elseif($getToken != null){
            $signup = $jwtAuth->signup($usuario, $pwd , $getToken);
            // var_dump($signup);die();
        }else{
            $signup =  array(
                'status'=> 'error',
                'message' => 'Envia tus datos por post'
            );
        }
        // $signup = $jwtAuth->signup($usuario, $pwd);
        return response()->json($signup, 200);
    }
}
