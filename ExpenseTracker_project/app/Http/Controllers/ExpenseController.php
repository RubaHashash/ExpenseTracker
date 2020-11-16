<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{

    public function viewExpenses(){
        $expense = Expense::orderBy('created_at','desc')
        ->join('categories','categories.id',"=", "expenses.category_id")
        ->select("expenses.*","categories.category_name")->get();

        return json_encode($expense);
    }


}
