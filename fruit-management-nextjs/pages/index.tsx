import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../utils/api';

type Fruit = { id: number; name: string; price: string; quantity: number };

export default function Home() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchFruits = async () => {
    try {
      const res = await api.get("/fruits");
      setFruits(res.data);
    } catch (error) {
      console.error('Error fetching fruits:', error);
    }
  };

  const deleteFruit = async (id: number) => {
    if (confirm("Are you sure?")) {
      try {
        await api.delete(`/fruits/${id}`);
        setSuccessMessage('Fruit deleted successfully!');
        fetchFruits();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting fruit:', error);
      }
    }
  };   

  useEffect(() => {
    fetchFruits();
  }, []);

    return (
        <div className="bg-light min-h-screen">
            <div className="container mt-5">
                <h1 className="mb-4">🍎 Fruit Management System</h1>

                {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                )}

                <Link href="/add">
                    <button className="btn btn-primary mb-3">Add New Fruit</button>
                </Link>

                <table className="table table-bordered bg-white shadow-sm">
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
                        {fruits.map(fruit => (
                            <tr key={fruit.id}>
                                <td>{fruit.id}</td>
                                <td>{fruit.name}</td>
                                <td>{fruit.price}</td>
                                <td>{fruit.quantity}</td>
                                <td>
                                    <Link href={`/edit/${fruit.id}`}>
                                        <button className="btn btn-warning btn-sm">Edit</button>
                                    </Link>
                                    {' '}
                                    <button 
                                        onClick={() => deleteFruit(fruit.id)} 
                                        className="btn btn-danger btn-sm"
                                        style={{marginLeft: '5px'}}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
