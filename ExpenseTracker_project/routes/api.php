<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CategoryController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [RegisterController::class,'Register']);

Route::post('/login', [LoginController::class,'Login']);

Route::get('/expense', [ExpenseController::class,"viewExpenses"]);

Route::post('/category/add',[CategoryController::class, 'AddCategory']);

Route::get('/getCategory', [ExpenseController::class,"getCategories"]);

Route::post('/addExpense/add', [ExpenseController::class,"AddExpense"]);

Route::delete('/expense/delete/{id}', [ExpenseController::class,"destroy"]);

