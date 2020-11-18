<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\Expense;
use App\Models\Category;

use Illuminate\Http\Request;

class ExpenseController extends Controller
{

    public function viewExpenses(){
        $expense = Expense::orderBy('created_at','desc')
        ->join('categories','categories.id',"=", "expenses.category_id")
        ->select("expenses.*","categories.category_name")->get();

        return json_encode($expense);
    }


    public function getCategories(){
        $category = Category::get();

        return json_encode($category);
        
    }


    public function AddExpense(Request $request){
        

        Validator::make($request->all(), [
            'exp_date' => ['required','date'],
            'exp_amount'=> ['required','between:0,9999999.99'],
            'exp_category'=>['required'],
        ])->validate();


        $date = $request->get('exp_date');
        $amount = $request->get('exp_amount');
        $category = $request->get('exp_category');
        $user_id = $request->get('user');

        $category_id = Category::where('category_name',"=", $category)->first();

        Expense::create([
            'date'=> $date,
            'amount'=> $amount,
            'category_id'=> $category_id->id,
            'user_id'=>$user_id
        ]);

        $response = array('status'=>'Success','message'=>'Registered Successfully');

        return json_encode($response);
    }

    public function destroy($id){

        $expense = Expense::find($id);
        $expense->delete();
    }
}
