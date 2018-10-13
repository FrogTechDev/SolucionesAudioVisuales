<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use Illuminate\Support\Facades\DB;
use App\Usuario;

class ActionUsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $usuarios = Usuario::all();
        return response()->json(array(
            'usuarios' => $usuarios,
            'status' => 'success',
        ), 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $usuario = Usuario::where('UsuarioId', '=', $id)->first();
        return response()->json(array(
            'usuario' => $usuario,
            'status' => 'success',
        ), 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){
            $json = $request->input('json', null);
            $params = json_decode($json);
            $params_array = json_decode($json, true);

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
            unset($params_array['Nombre']);
            unset($params_array['Usuario']);
            unset($params_array['Correo']);
            unset($params_array['Password']);
            unset($params_array['IsActivo']);

            $usuario = Usuario::find($id)->update($params_array);
            if($usuario == 1){
                $data = array(
                    'usuario' => $usuario,
                    'status' => 'success',
                    'code' => 200
                );
            }else{
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'El Usuario no existe!'
                );
            }
        }else{
            $data = array(
                'status' => 'error',
                'code' => 400,
                'message' => 'Usuario no autorizado!'
            );
        }
        return response()->json($data, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        // var_dump($request);die();
        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){
            $usuario = Usuario::where('UsuarioId',$id);
            $backUsuario = $usuario->first();
            $usuario->delete();

            $data = array(
                'usuario' => $backUsuario,
                'status' => 'success',
                'code' => 200
            );

        }else{
            $data = array(
                'status' => 'error',
                'code' => 400,
                'message' => 'Usuario no autorizado!'
            );
        }
        return response()->json($data, 200);
    }
}
