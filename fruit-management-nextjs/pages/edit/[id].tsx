import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import Link from "next/link";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;
    
    const fetchFruit = async () => {
      try {
        const res = await api.get(`/fruits/${id}`);
        setName(res.data.name);
        setPrice(res.data.price);
        setQuantity(res.data.quantity.toString());
      } catch (error) {
        console.error('Error fetching fruit:', error);
      }
    };

    fetchFruit();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    
    alert('Edit form submitted! Check console for details.');
    console.log('Edit form submitted with data:', { id, name, price, quantity });
    
    try {
      const response = await api.put(`/fruits/${id}`, { name, price, quantity });
      console.log('Edit API response:', response);
      alert('Fruit updated successfully!');
      router.push("/");
    } catch (error: any) {
      console.error('Edit API error:', error);
      alert('Edit error occurred: ' + error.message);
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat() as string[];
        setErrors(errorMessages);
      } else {
        setErrors(['An error occurred while updating the fruit.']);
      }
    }
  };

  return (
    <div className="bg-light min-h-screen">
      <div className="container mt-5">
        <h1 className="mb-4">✏️ Edit Fruit</h1>

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
              value={name} 
              className="form-control"
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
              value={quantity} 
              className="form-control"
              onChange={e=>setQuantity(e.target.value)} 
            />
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
          {' '}
          <Link href="/" className="btn btn-secondary">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
