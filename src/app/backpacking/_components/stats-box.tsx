import { TripStats } from '@/types/backpacking';
import { Badge } from '@/app/_components/badge';
import { getDifficultyVariant } from '@/lib/backpacking-helpers';

interface StatsBoxProps {
  stats: TripStats;
}

export function StatsBox({ stats }: StatsBoxProps) {
  return (
    <aside className="stats-box">
      <div className="rounded-lg border bg-card p-6 shadow-sm lg:sticky lg:top-24">
        <h3 className="mb-4 text-lg font-semibold">Trail Stats</h3>

        <div className="space-y-3">
          {/* Distance */}
          <div className="flex items-start gap-2">
            <span className="text-lg" aria-label="Distance">
              📏
            </span>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Distance</div>
              <div className="font-medium">{stats.distance}</div>
            </div>
          </div>

          {/* Elevation */}
          <div className="flex items-start gap-2">
            <span className="text-lg" aria-label="Elevation">
              📈
            </span>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Elevation</div>
              <div className="font-medium">{stats.elevation}</div>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-start gap-2">
            <span className="text-lg" aria-label="Duration">
              ⏱️
            </span>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="font-medium">{stats.duration}</div>
            </div>
          </div>

          {/* Difficulty */}
          <div className="flex items-start gap-2">
            <span className="text-lg" aria-label="Difficulty">
              💪
            </span>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Difficulty</div>
              <div className="mt-1">
                <Badge variant={getDifficultyVariant(stats.difficulty)}>
                  {stats.difficulty}
                </Badge>
              </div>
            </div>
          </div>

          {/* Season */}
          <div className="flex items-start gap-2">
            <span className="text-lg" aria-label="Season">
              🗓️
            </span>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Season</div>
              <div className="font-medium">{stats.season}</div>
            </div>
          </div>

          {/* Permits (optional) */}
          {stats.permits && (
            <div className="flex items-start gap-2">
              <span className="text-lg" aria-label="Permits">
                🎫
              </span>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground">Permits</div>
                <div className="font-medium">{stats.permits}</div>
              </div>
            </div>
          )}

          {/* Route URL (optional) */}
          {stats.routeUrl && (
            <div className="flex items-start gap-2">
              <span className="text-lg" aria-label="Route">
                🗺️
              </span>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground">Trail Route</div>
                <a
                  href={stats.routeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  View on AllTrails →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
