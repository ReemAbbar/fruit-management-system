import { useState } from "react";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import Link from "next/link";

export default function Add() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);
        
        alert('Form submitted! Check console for details.');
        console.log('Form submitted with data:', { name, price, quantity });
        
        try {
            const response = await api.post("/fruits", { name, price, quantity });
            console.log('API response:', response);
            alert('Fruit added successfully!');
            router.push("/");
        } catch (error: any) {
            console.error('API error:', error);
            alert('Error occurred: ' + error.message);
            if (error.response?.data?.errors) {
                const errorMessages = Object.values(error.response.data.errors).flat() as string[];
                setErrors(errorMessages);
            } else {
                setErrors(['An error occurred while saving the fruit.']);
            }
        }
    };

    return (
        <div className="bg-light min-h-screen">
            <div className="container mt-5">
                <h1 className="mb-4">➕ Add New Fruit</h1>

                {errors.length > 0 && (
                    <div className="alert alert-danger">
                        <ul style={{margin: 0, paddingLeft: '20px'}}>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            className="form-control" 
                            placeholder="Enter fruit name"
                            value={name} 
                            onChange={e=>setName(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price ($)</label>
                        <input 
                            type="number" 
                            name="price" 
                            className="form-control" 
                            step="0.01" 
                            placeholder="Enter price"
                            value={price} 
                            onChange={e=>setPrice(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <input 
                            type="number" 
                            name="quantity" 
                            className="form-control" 
                            placeholder="Enter quantity"
                            value={quantity} 
                            onChange={e=>setQuantity(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Save</button>
                    {' '}
                    <Link href="/" className="btn btn-secondary">
                        Back
                    </Link>
                </form>
            </div>
        </div>
    );
}