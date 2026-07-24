import Link from "next/link";

export default function Footer() {
  return (
    <footer className="eriu e-footer">
      <div className="e-wrap">
        <div className="e-foot-grid">
          <div className="e-foot-brand">
            <Link href="/" className="e-brand"><span className="mk">ÉRIU</span><span className="reg">®</span></Link>
            <p>Custom performance leisurewear, manufactured to order and branded for teams, gyms and brands. Designed in Ireland.</p>
            <div className="fbrow">
              <span className="fb">Made to order</span>
              <span className="fb">MOQ 10</span>
              <span className="fb">Ships worldwide</span>
            </div>
          </div>

          <div className="e-foot-col">
            <h4>The Range</h4>
            <Link href="/shop">All products</Link>
            <Link href="/shop?family=tank">Racer Tanks</Link>
            <Link href="/shop?family=compression">Compression</Link>
            <Link href="/shop?family=leggings">Leggings</Link>
            <Link href="/shop?family=yoga">Yoga &amp; Studio</Link>
          </div>

          <div className="e-foot-col">
            <h4>Order</h4>
            <Link href="/customise">How it works</Link>
            <Link href="/customise">Bulk pricing</Link>
            <Link href="/customise">Order samples</Link>
            <Link href="/customise">Request a quote</Link>
            <Link href="/fabric">Fabric &amp; specs</Link>
          </div>

          <div className="e-foot-col">
            <h4>Who we kit</h4>
            <Link href="/for/teams">Clubs &amp; teams</Link>
            <Link href="/for/gyms">Gyms &amp; studios</Link>
            <Link href="/for/events">Events &amp; races</Link>
            <Link href="/for/business">Corporate &amp; brands</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div className="e-foot-bottom">
          <span>© {new Date().getFullYear()} Ériu Performance Wear</span>
          <span>Designed in Ireland</span>
        </div>
      </div>
    </footer>
  );
}
