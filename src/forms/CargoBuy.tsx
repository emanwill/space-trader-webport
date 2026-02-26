export default function CargoBuy() {
  return (
    <div>
      {/* lblStatement (example shown) y=8 h=13 */}
      <p>The trader wants to sell Machines for the price of 8,888 cr. each.</p>
      {/* lblQuestion (example shown) y=24 h=16 */}
      <p>How many do you want to buy?</p>
      {/* numAmount x=168 y=22 */}
      <input name="amount" min={1} max={999} value={1} />
      {/* btnOk x=95 y=48 */}
      <button>OK</button>
      {/* btnAll x=143 y=48 */}
      <button>All</button>
      {/* btnNone x=191 y=48 */}
      <button>None</button>
      {/* lblAvailable (example shown) */}
      <p>The trader has 88 units for sale.</p>
      {/* lblAfford (example shown) */}
      <p>You can afford to buy 88 units.</p>
    </div>
  );
}
