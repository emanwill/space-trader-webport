export default function CargoSell() {
  return (
    <div>
      <p>The trader wants to buy CARGO and offers 999 cr. each.</p>
      <p>You paid about 111 cr. per unit, and can sell 10 units.</p>
      {/* Your ^1 per unit is ^2 */}
      {/* ^1 = "profit" or "loss" */}
      <p>Your profit per unit is 3 cr.</p>
      <div>
        <span>How many do you want to sell?</span>
        <input type="number" />
      </div>
      <div>
        <button>Ok</button>
        <button>All</button>
        <button>None</button>
      </div>
    </div>
  );
}
