<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;



class RegisterController extends Controller
{
    public function Register(Request $request){
        Validator::make($request->all(), [
            'email' => ['required', 'email', 'max:255','unique:users'],
            'name' => ['required','string', 'max:255'],
            'password' => ['required','string', 'max:255']
        ])->validate();

        $email = $request->get('email');
        $name = $request->get('name');
        $password = $request->get('password');

        User::create([
            'email'=> $email,
            'name'=> $name,
            'password'=> Hash::make($password)
        ]);

        $response = array('status'=>'Success','message'=>'Registered Successfully');

        return json_encode($response);

    }
}
