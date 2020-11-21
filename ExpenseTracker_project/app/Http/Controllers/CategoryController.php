<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Expense;
use DB;


class CategoryController extends Controller
{
    public function AddCategory(Request $request){

        Validator::make($request->all(), [
            'category_name' => ['required','string', 'max:255','unique:categories']
        ])->validate();

        $name = $request->get('category_name');

        Category::create([
            'category_name'=> $name
        ]);

        $response = array('status'=>'Success','message'=>'Registered Successfully');

        return json_encode($response);
    }

    public function viewCategories(){

        $category=Category::select('category_name')->get();


        return $category;
    }

    public function pieChart($id){

        $categories = Expense::where('expenses.user_id','=',$id)
        ->join('categories','expenses.category_id','=','categories.id')
        ->select('categories.category_name',DB::raw("SUM(expenses.amount) as sum"))
        ->groupBy("expenses.category_id")           
        ->get();

        return $categories;
    }
}
