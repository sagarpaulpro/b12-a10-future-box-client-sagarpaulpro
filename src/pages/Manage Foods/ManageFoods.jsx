import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageFoods = ({ userEmail }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(`http://localhost:3000/food?donatorEmail=${userEmail}`);
        const data = await res.json();
        setFoods(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [userEmail]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:3000/foods/${id}`, { method: "DELETE" });
          if (res.ok) {
            setFoods(foods.filter((food) => food._id !== id));
            Swal.fire("Deleted!", "Your food has been deleted.", "success");
          }
        } catch (err) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  const handleEdit = async (food) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Food",
      html: `
        <input id="swal-foodName" class="swal2-input" placeholder="Food Name" value="${food.foodName}">
        <input id="swal-foodQuantity" class="swal2-input" placeholder="Quantity" value="${food.foodQuantity}">
        <input id="swal-pickupLocation" class="swal2-input" placeholder="Pickup Location" value="${food.pickupLocation}">
        <input id="swal-expireDate" type="date" class="swal2-input" placeholder="Expire Date" value="${food.expireDate}">
        <textarea id="swal-additionalNotes" class="swal2-textarea" placeholder="Additional Notes">${food.additionalNotes || ""}</textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          foodName: document.getElementById("swal-foodName").value,
          foodQuantity: document.getElementById("swal-foodQuantity").value,
          pickupLocation: document.getElementById("swal-pickupLocation").value,
          expireDate: document.getElementById("swal-expireDate").value,
          additionalNotes: document.getElementById("swal-additionalNotes").value,
        };
      },
      showCancelButton: true,
    });

    if (formValues) {
      try {
        const res = await fetch(`http://localhost:3000/foods/${food._id}`, {
          method: "PATCH", // অথবা PUT
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        });
        const data = await res.json();
        if (data.success) {
          // Update state
          setFoods(foods.map(f => f._id === food._id ? { ...f, ...formValues } : f));
          Swal.fire("Updated!", "Food updated successfully.", "success");
        }
      } catch (err) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Manage My Foods</h2>
      {foods.length === 0 ? (
        <p>No foods added yet.</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Food Name</th>
              <th>Quantity</th>
              <th>Pickup Location</th>
              <th>Expire Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, i) => (
              <tr key={food._id}>
                <td>{i + 1}</td>
                <td>{food.foodName}</td>
                <td>{food.foodQuantity}</td>
                <td>{food.pickupLocation}</td>
                <td>{food.expireDate}</td>
                <td>{food.additionalNotes || "-"}</td>
                <td className="space-x-2">
                  <button className="btn btn-sm btn-info" onClick={() => handleEdit(food)}>Edit</button>
                  <button className="btn btn-sm btn-error" onClick={() => handleDelete(food._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageFoods;
