<?php

namespace App\Http\Controllers;

use App\Models\Fruit;
use Illuminate\Http\Request;

class FruitController extends Controller
{
    // Display all fruits
    public function index()
    {
        $fruits = Fruit::all();
        return view('fruits.index', compact('fruits'));
    }

    // Show the form to create a new fruit
    public function create()
    {
        return view('fruits.create');
    }

    // Store a new fruit in the database
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
        ]);

        Fruit::create($request->all());
        return redirect()->route('fruits.index')->with('success', 'Fruit added successfully.');
    }

    // Show the form to edit an existing fruit
    public function edit(Fruit $fruit)
    {
        return view('fruits.edit', compact('fruit'));
    }

    // Update an existing fruit in the database
    public function update(Request $request, Fruit $fruit)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
        ]);

        $fruit->update($request->all());
        return redirect()->route('fruits.index')->with('success', 'Fruit updated successfully.');
    }

    // Delete a fruit from the database
    public function destroy(Fruit $fruit)
    {
        $fruit->delete();
        return redirect()->route('fruits.index')->with('success', 'Fruit deleted successfully.');
    }
}
