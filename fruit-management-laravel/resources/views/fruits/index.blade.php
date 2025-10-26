<!DOCTYPE html>
<html>
<head>
    <title>Fruit Management</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body class="bg-light">

<div class="container mt-5">
    <h1 class="mb-4">🍎 Fruit Management System</h1>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <a href="{{ route('fruits.create') }}" class="btn btn-primary mb-3">Add New Fruit</a>

    <table class="table table-bordered bg-white shadow-sm">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price ($)</th>
                <th>Quantity</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($fruits as $fruit)
            <tr>
                <td>{{ $fruit->id }}</td>
                <td>{{ $fruit->name }}</td>
                <td>{{ $fruit->price }}</td>
                <td>{{ $fruit->quantity }}</td>
                <td>
                    <a href="{{ route('fruits.edit', $fruit->id) }}" class="btn btn-warning btn-sm">Edit</a>
                    <form action="{{ route('fruits.destroy', $fruit->id) }}" method="POST" style="display:inline-block;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger btn-sm"
                            onclick="return confirm('Are you sure?')">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>

</body>
</html>
