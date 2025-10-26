<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Fruit;

class FruitApiController extends Controller
{
    public function index()
    {
        return response()->json(Fruit::all(), 200);
    }

    public function show($id)
    {
        $fruit = Fruit::find($id);
        if (!$fruit) return response()->json(['message' => 'Fruit not found'], 404);
        return response()->json($fruit, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
        ]);

        $fruit = Fruit::create($validated);
        return response()->json($fruit, 201);
    }

    public function update(Request $request, $id)
    {
        $fruit = Fruit::find($id);
        if (!$fruit) return response()->json(['message' => 'Fruit not found'], 404);
        
        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric',
            'quantity' => 'sometimes|required|integer',
        ]);

        $fruit->update($validated);
        return response()->json($fruit, 200);
    }

    public function destroy($id)
    {
        $fruit = Fruit::find($id);
        if (!$fruit) return response()->json(['message' => 'Fruit not found'], 404);
        $fruit->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
