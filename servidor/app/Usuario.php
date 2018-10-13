<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'erp.Usuarios';
    protected $primaryKey = 'UsuarioId';
    public $timestamps = false;
    //
}
