<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;

class LoginController extends Controller
{
    public function Login(Request $request){
        Validator::make($request->all(), [
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required','string', 'max:255']
        ])->validate();

        $email = $request->get('email');
        $password = $request->get('password');
        

        $user = User::where('email', $email)->first();
        
        if($user != null && (Hash::check($password, $user->password))){
            $response = array('status'=>'Success','message'=>'Logged in Successfully','user'=>$user);
        }
        else{
            $response = array('status'=>'Failed','message'=>'Logged in Failed');

        }

        return json_encode($response);
    }
}
