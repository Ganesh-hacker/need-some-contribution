// import React, { useEffect, useState } from "react";
// import '../Stylesheets/Cartdetails.css';
// import Profile from './Profile';

// const CartItem = ({ item, onAdd, onSubtract, onRemove }) => {
//   return (
//     <li className="_grid shopping-cart--list-item">
//       <div className="_column product-image">
//         <img className="product-image--img" src={item.imageUrl} alt="Item image" />
//       </div>
//       <div className="_column product-info">
//         <h4 className="product-name">{item.name}</h4>
//         <p className="product-desc">{item.desc}</p>
//         <div className="price product-single-price">INR {item.price.toFixed(2)}</div>
//       </div>
//       <div className="_column product-modifiers" data-product-price={item.price}>
//         <div className="_grid">
//           <button className="_btn _column product-subtract" onClick={() => onSubtract(item._id)}>&minus;</button>
//           <div className="_column product-qty">{item.qty}</div>
//           <button className="_btn _column product-plus" onClick={() => onAdd(item._id)}>+</button>
//         </div>
//         <button className="_btn entypo-trash product-remove" onClick={() => onRemove(item._id)}>Remove</button>
//         <div className="price product-total-price">{(item.price * item.qty).toFixed(2)}/-</div>
//       </div>
//     </li>
//   );
// };

// const CartFooter = ({ subtotal, shipping, taxes, total, onCheckout }) => {
//   return (
//     <footer className="_grid cart-totals">
//       <div className="_column subtotal" id="subtotalCtr">
//         <div className="cart-totals-key">Subtotal</div>
//         <div className="cart-totals-value">INR {subtotal.toFixed(2)}</div>
//       </div>
//       <div className="_column shipping" id="shippingCtr">
//         <div className="cart-totals-key">Shipping</div>
//         <div className="cart-totals-value">INR {shipping.toFixed(2)}</div>
//       </div>
//       <div className="_column taxes" id="taxesCtr">
//         <div className="cart-totals-key">Taxes (6%)</div>
//         <div className="cart-totals-value">INR {taxes.toFixed(2)}</div>
//       </div>
//       <div className="_column total" id="totalCtr">
//         <div className="cart-totals-key">Total</div>
//         <div className="cart-totals-value">INR {total.toFixed(2)}</div>
//       </div>
//       <div className="_column checkout">
//         <button className="_btn checkout-btn entypo-forward" onClick={onCheckout}>Checkout</button>
//       </div>
//     </footer>
//   );
// };

// const Cartitemdetailscomp = () => {
//   const [cartedItems, setCartedItems] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const userId = localStorage.getItem('userid');
//     fetch(`http://localhost:3005/v1/cart/${userId}`)
//       .then(response => response.json())
//       .then(data => {
//         setCartedItems(data);
//       })
//       .catch(error => {
//         setError(error);
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const handleAdd = (id) => {
//     setCartedItems(cartedItems.map(item => 
//       item._id === id ? { ...item, qty: item.qty + 1 } : item
//     ));
//   };

//   const handleSubtract = (id) => {
//     setCartedItems(cartedItems.map(item => 
//       item._id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
//     ));
//   };

//   const handleRemove = async (id) => {
//     const userId = localStorage.getItem('userid');
//     if (!userId) {
//         console.error("User ID not found in localStorage");
//         return;
//     }

//     try {
//         const response = await fetch(`http://localhost:3005/cart/${id}/${userId}`, {
//             method: "DELETE",
//         });
//         if (response.ok) {
//             window.location.href = "/cartdetails";
//         } else {
//             const errorData = await response.json();
//             console.error("Error deleting item:", errorData.message);
//         }
//     } catch (error) {
//         console.error("Error deleting item:", error);
//     }
// };


//   const calculateSubtotal = () => {
//     return cartedItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
//   };

//   const calculateShipping = (subtotal) => {
//     return subtotal > 100 ? 0 : 10;
//   };

//   const calculateTaxes = (subtotal) => {
//     return subtotal * 0.06;
//   };

//   const subtotal = calculateSubtotal();
//   const shipping = calculateShipping(subtotal);
//   const taxes = calculateTaxes(subtotal);
//   const total = subtotal + shipping + taxes;

//   const handleCheckout = async () => {
//     const userId = localStorage.getItem('userid');
//     if (!userId) {
//         console.error("User ID not found in localStorage");
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:3005/checkout', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ userId, items: cartedItems, total })
//         });
//         if (response.ok) {
//             const data = await response.json();
//             alert(`Checkout successful! Order ID: ${data.orderId}`);
//             // Clear the cart or redirect to another page if needed
//         } else {
//             const errorData = await response.json();
//             console.error("Error during checkout:", errorData.message);
//         }
//     } catch (error) {
//         console.error("Error during checkout:", error);
//     }
//   };

//   return (
//     <div className="mainprofilepagecontainer">
//       <Profile />
//       <div className="main">
//         <h1>Shopping Cart</h1>
//         <h2 className="sub-heading"></h2>
//         {error ? (
//           <div className="error-message">{error}</div>
//         ) : (
//           <section className="shopping-cart">
//             <ol className="ui-list shopping-cart--list" id="shopping-cart--list">
//               {cartedItems.map(item => (
//                 <CartItem 
//                   key={item._id} 
//                   item={item} 
//                   onAdd={handleAdd} 
//                   onSubtract={handleSubtract} 
//                   onRemove={handleRemove} 
//                 />
//               ))}
//             </ol>
//             <CartFooter 
//               subtotal={subtotal} 
//               shipping={shipping} 
//               taxes={taxes} 
//               total={total} 
//               onCheckout={handleCheckout} 
//             />
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cartitemdetailscomp;


import React, { useEffect, useState } from "react";
import '../Stylesheets/Cartdetails.css';
import Profile from './Profile';
import {Link} from 'react-router-dom'
const CartItem = ({ item, onAdd, onSubtract, onRemove }) => {
  return (
    <li className="_grid shopping-cart--list-item">
      <div className="_column product-image">
        <img className="product-image--img" src={item.imageUrl} alt="Item image" />
      </div>
      <div className="_column product-info">
        <h4 className="product-name">{item.name}</h4>
        <p className="product-desc">{item.desc}</p>
        <div className="price product-single-price">INR {item.price.toFixed(2)}</div>
      </div>
      <div className="_column product-modifiers" data-product-price={item.price}>
        <div className="_grid">
          <button className="_btn _column product-subtract" onClick={() => onSubtract(item._id)}>-</button>
          <div className="_column product-qty">{item.qty}</div>
          <button className="_btn _column product-plus" onClick={() => onAdd(item._id)}>+</button>
        </div>
        <button className="_btn entypo-trash product-remove" onClick={() => onRemove(item._id)}>Remove</button>
        <div className="price product-total-price">{(item.price * item.qty).toFixed(2)}/-</div>
      </div>
    </li>
  );
};

const CartFooter = ({ subtotal, shipping, taxes, total, onCheckout }) => {
  return (
    <footer className="_grid cart-totals">
      <div className="_column subtotal" id="subtotalCtr">
        <div className="cart-totals-key">Subtotal</div>
        <div className="cart-totals-value">INR {subtotal.toFixed(2)}</div>
      </div>
      <div className="_column shipping" id="shippingCtr">
        <div className="cart-totals-key">Shipping</div>
        <div className="cart-totals-value">INR {shipping.toFixed(2)}</div>
      </div>
      <div className="_column taxes" id="taxesCtr">
        <div className="cart-totals-key">Taxes (6%)</div>
        <div className="cart-totals-value">INR {taxes.toFixed(2)}</div>
      </div>
      <div className="_column total" id="totalCtr">
        <div className="cart-totals-key">Total</div>
        <div className="cart-totals-value">INR {total.toFixed(2)}</div>
      </div>
      <div className="_column checkout">
        <button className="_btn checkout-btn entypo-forward" onClick={onCheckout}>Checkout</button>
      </div>
    </footer>
  );
};

const Cartitemdetailscomp = () => {
  const [cartedItems, setCartedItems] = useState([]);
  const [error, setError] = useState(null);
  const [addressdata, setaddressdata] = useState([]);
  const [loading, setLoading] = useState(true);   
   const userid = localStorage.getItem('userid');

  useEffect(() => {
    const userId = localStorage.getItem('userid');
    fetch(`http://localhost:3005/v1/cart/${userId}`)
      .then(response => response.json())
      .then(data => {
        setCartedItems(data);
      })
      .catch(error => {
        setError(error);
        console.error('Error fetching data:', error);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:3005/address/${userid}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch address data');
            }
            return response.json();
        })
        .then(data => {
            setaddressdata(data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
            console.error('Error fetching data:', error);
        });
        console.log("addressdata",addressdata);
}, [userid]);


  const updateQuantity = async (id, qty) => {
    const userId = localStorage.getItem('userid');
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3005/cart/${id}/${userId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ qty:qty })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating quantity:", errorData.message);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error updating quantity:", error);
      return false;
    }
  };

  const handleAdd = async (id) => {
    const item = cartedItems.find(item => item._id === id);
   
    if (item) {
      const newQty = item.qty + 1;
      if (await updateQuantity(id, newQty)) {
        setCartedItems(cartedItems.map(item =>
          item._id === id ? { ...item, qty: newQty } : item
        ));
      }
  
    }
  };

  const handleSubtract = async (id) => {
    const item = cartedItems.find(item => item._id === id);
    if (item && item.qty > 1) {
      const newQty = item.qty - 1;
      if (await updateQuantity(id, newQty)) {
        setCartedItems(cartedItems.map(item =>
          item._id === id ? { ...item, qty: newQty } : item
        ));
      }
    }
  };

  const handleRemove = async (id) => {
    const userId = localStorage.getItem('userid');
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3005/cart/${id}/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCartedItems(cartedItems.filter(item => item._id !== id));
      } else {
        const errorData = await response.json();
        console.error("Error deleting item:", errorData.message);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const calculateSubtotal = () => {
    return cartedItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  };

  const calculateShipping = (subtotal) => {
    return subtotal > 100 ? 0 : 10;
  };

  const calculateTaxes = (subtotal) => {
    return subtotal * 0.06;
  };

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping(subtotal);
  const taxes = calculateTaxes(subtotal);
  const total = subtotal + shipping + taxes;

  const handleCheckout = async () => {
    const userId = localStorage.getItem('userid');
    localStorage.setItem("totalprice",total);
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    try {
      const response = await fetch('http://localhost:3005/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, items: cartedItems, total })
      });
      if (response.ok) {
        const data = await response.json();
        alert(`Checkout successful! Order ID: ${data.orderId}`);
        // Clear the cart or redirect to another page if needed
      } else {
        const errorData = await response.json();
        console.error("Error during checkout:", errorData.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
  function handleaddress() {
    localStorage.setItem("addressid", addressdata[0]._id);
    console.log("Address ID:", localStorage.getItem("addressid"));
}
  return (
    <div className="mainprofilepagecontainer">
      <Profile />
      <div className="main">
        <h1>Shopping Cart</h1>
        <h2 className="sub-heading"></h2>
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <section className="shopping-cart">
            <ol className="ui-list shopping-cart--list" id="shopping-cart--list" style={{overflowX:"hidden",overflowY:"auto"}} >
              {cartedItems.map(item => (
                <CartItem 
                  key={item._id} 
                  item={item} 
                  onAdd={handleAdd} 
                  onSubtract={handleSubtract} 
                  onRemove={handleRemove} 
                />
              ))}
            </ol>

              {addressdata.length > 0 ? (
          <label className='shippingaddress-item'>
            <input type="radio" name="selectedAddress" className="radio-button" onClick={handleaddress} />
            <div>
              <div style={{fontSize:"20px",color:"black"}}><b>{addressdata[0].name}</b></div>
              <div  style={{fontSize:"16px",color:"black",fontWeight:"lighter"}}>{addressdata[0].houseNumber}</div>
              <div style={{fontSize:"16px",color:"black",fontWeight:"lighter"}}>{addressdata[0].area}</div>
              <div  style={{fontSize:"16px",color:"black",fontWeight:"lighter"}}>{addressdata[0].landmark}</div>
              <div  style={{fontSize:"16px",color:"black",fontWeight:"lighter"}}>{addressdata[0].town} {addressdata[0].state} {addressdata[0].pincode}</div>
              <div style={{fontSize:"16px",color:"black",fontWeight:"lighter"}}>{addressdata[0].number}</div><br />
              <div className='edit-buttons'>
                    <button><Link to='/address'>Change address</Link></button>

            </div>
            </div>
          </label>
        ) : (
          <div>No address data available.</div>
        )}
            <CartFooter 
              subtotal={subtotal} 
              shipping={shipping} 
              taxes={taxes} 
              total={total} 
              onCheckout={handleCheckout} 
            />
          </section>
        )}
      
      </div>
    </div>
  );
};

export default Cartitemdetailscomp;
