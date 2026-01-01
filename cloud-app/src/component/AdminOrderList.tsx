import { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/api/orders/admin/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(data);
    } catch (err) {
      console.error("Admin fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllOrders(); }, []);

  const handleVerify = async (id: string, status: 'Paid' | 'Failed') => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/orders/admin/${id}/payment`, 
        { status }, 
        { headers: { Authorization: `Bearer ${token}` }}
      );
      alert(`Order marked as ${status}`);
      fetchAllOrders(); // Refresh list
    } catch (err) {
      alert("Verification failed");
    }
  };

  if (loading) return <div className="p-10 text-neutral-500">Loading Orders...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-yellow-500">ORDER MANAGEMENT</h2>
        <div className="bg-white/5 px-4 py-2 rounded-full text-xs font-bold text-neutral-400">
          {orders.length} Total Requests
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Bank Reference</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order._id} className="bg-neutral-900/50 border border-white/5 rounded-2xl group hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-5">
                  <p className="font-bold text-sm">{order.user?.name || 'Unknown'}</p>
                  <p className="text-xs text-neutral-500">{order.user?.email}</p>
                </td>
                <td className="px-6 py-5">
                  <span className="font-mono text-blue-400 bg-blue-400/10 px-3 py-1 rounded text-xs uppercase">
                    {order.bankProofRef}
                  </span>
                </td>
                <td className="px-6 py-5 font-black text-yellow-500">
                  ₦{order.totalAmount.toLocaleString()}
                </td>
                <td className="px-6 py-5">
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                    order.paymentStatus === 'Paid' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-5">
                  {order.paymentStatus !== 'Paid' && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleVerify(order._id, 'Paid')}
                        className="p-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
                        title="Confirm Payment"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button 
                         onClick={() => handleVerify(order._id, 'Failed')}
                        className="p-2 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white rounded-lg transition-colors"
                        title="Reject Payment"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderList;