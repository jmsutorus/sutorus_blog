import { GearItem } from '@/types/backpacking';
import { Card } from '@/components/ui/card';

interface GearShowcaseProps {
  gear: {
    big3: GearItem[];
    clothing: GearItem[];
    cooking: GearItem[];
    electronics: GearItem[];
  };
}

function GearCard({ item }: { item: GearItem }) {
  return (
    <Card className="p-4">
      <h4 className="font-semibold">{item.name}</h4>
      <p className="text-sm text-muted-foreground">{item.category}</p>
      {item.weight && (
        <p className="mt-1 text-sm font-medium text-primary">{item.weight}</p>
      )}
      {item.notes && <p className="mt-2 text-sm">{item.notes}</p>}
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm text-primary hover:underline"
        >
          View Product →
        </a>
      )}
    </Card>
  );
}

export function GearShowcase({ gear }: GearShowcaseProps) {
  return (
    <section className="container mx-auto px-0 sm:px-4 py-16">
      <h2 className="mb-8 text-4xl font-bold">Gear</h2>

      {/* The Big 3 */}
      {gear.big3 && gear.big3.length > 0 && (
        <div className="mb-12">
          <h3 className="mb-4 text-2xl font-semibold">The Big 3</h3>
          <p className="mb-4 text-muted-foreground">
            The three heaviest items in any backpack: shelter, sleep system, and
            backpack itself.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {gear.big3.map((item, index) => (
              <GearCard key={index} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Clothing */}
      {gear.clothing && gear.clothing.length > 0 && (
        <div className="mb-12">
          <h3 className="mb-4 text-2xl font-semibold">Clothing</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gear.clothing.map((item, index) => (
              <GearCard key={index} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Cooking */}
      {gear.cooking && gear.cooking.length > 0 && (
        <div className="mb-12">
          <h3 className="mb-4 text-2xl font-semibold">Cooking</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gear.cooking.map((item, index) => (
              <GearCard key={index} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Electronics */}
      {gear.electronics && gear.electronics.length > 0 && (
        <div className="mb-12">
          <h3 className="mb-4 text-2xl font-semibold">Electronics</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gear.electronics.map((item, index) => (
              <GearCard key={index} item={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
