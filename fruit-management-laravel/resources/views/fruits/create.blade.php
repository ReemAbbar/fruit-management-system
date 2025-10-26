<!DOCTYPE html>
<html>
<head>
    <title>Add Fruit</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body class="bg-light">

<div class="container mt-5">
    <h1 class="mb-4">➕ Add New Fruit</h1>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('fruits.store') }}" method="POST" class="bg-white p-4 rounded shadow-sm">
        @csrf
        <div class="mb-3">
            <label>Name</label>
            <input type="text" name="name" class="form-control" placeholder="Enter fruit name">
        </div>
        <div class="mb-3">
            <label>Price ($)</label>
            <input type="number" name="price" class="form-control" step="0.01" placeholder="Enter price">
        </div>
        <div class="mb-3">
            <label>Quantity</label>
            <input type="number" name="quantity" class="form-control" placeholder="Enter quantity">
        </div>
        <button type="submit" class="btn btn-success">Save</button>
        <a href="{{ route('fruits.index') }}" class="btn btn-secondary">Back</a>
    </form>
</div>

</body>
</html>
