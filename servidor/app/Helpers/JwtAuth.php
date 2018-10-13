<?php
    namespace App\Helpers;

    use Firebase\JWT\JWT;
    use Illuminate\Support\Facades\DB;
    use App\Usuario;

class JwtAuth{

    public $key;

    public function __construct(){
        $this->key = '200921098992_m4c4n45';
    }

    public function signup($usuario, $password, $getToken = null){
        $path = storage_path() . "/resources/roles/$usuario.json";
        $user = Usuario::where(
            array(
                'Usuario' => $usuario,
                'Password' => $password
            ))->first();
        $signup = false;
        if(is_object($user))
        {
            $signup = true;
        }
        if (file_exists($path)) {
            $json = json_decode(file_get_contents($path), true);
        } else {
            $json = null;
        }



        if($signup){
            $token = array(
                'sub' => $user->UsuarioId,
                'email' => $user->Correo,
                'isActivo' => $user->IsActivo,
                'usuario' => $user->Usuario,
                'nombre' => $user->Nombre,
                'toc' => $json,
                'iat' => time(),
                'exp' => time() + (7 * 24 * 60 * 60)
            );
            $jwt = JWT::encode($token, $this->key, 'HS256');
            $decoded = JWT::decode($jwt, $this->key, array('HS256'));
            if(is_null($getToken)){
                return $jwt;
            }else{
                return $decoded;
            }
        }else{
            return array('status' => 'error', 'message' => 'Error en Inicio de sesion');
        }
    }

    public function checkToken($jwt, $getIdentity = false){
        $auth = false;

        try{
            $decoded = JWT::decode($jwt, $this->key, array('HS256'));
        }catch(\UnexpetedValueException $e){
            $auth = false;
        }catch(\DomainException $e){
            $auth = false;
        }

        if(isset($decoded) && is_object($decoded) && isset($decoded->sub)){
            $auth = true;
        }else{
            $auth= false;
        }

        if($getIdentity){
            return $decoded;
        }
        return $auth;
    }
}
