import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { memo } from "react";

type ZoomToolbarProps = {
  scale: number;
  onScaleChange: (scale: number) => void;
};

const ZoomToolbar = memo((props: ZoomToolbarProps) => {
  const { scale, onScaleChange } = props;

  const handleZoom = (value: number | "fit") => {
    if (value === "fit") {
      onScaleChange(0.3);
    } else {
      onScaleChange(value);
    }
  };
  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <Button
        variant={scale === Math.max(0.2, scale - 0.1) ? "default" : "outline"}
        size="icon"
        onClick={() => handleZoom(Math.max(0.2, scale - 0.1))}
      >
        <Icons.minus className="h-4 w-4" />
      </Button>
      <Button
        variant={scale === Math.min(2, scale + 0.1) ? "default" : "outline"}
        size="icon"
        onClick={() => handleZoom(Math.min(2, scale + 0.1))}
      >
        <Icons.plus className="h-4 w-4" />
      </Button>
      <Button
        variant={scale === 0.3 ? "default" : "outline"}
        onClick={() => handleZoom("fit")}
      >
        Fit
      </Button>
      <Button
        variant={scale === 0.5 ? "default" : "outline"}
        onClick={() => handleZoom(0.5)}
      >
        50%
      </Button>
      <Button
        variant={scale === 0.75 ? "default" : "outline"}
        onClick={() => handleZoom(0.75)}
      >
        75%
      </Button>
      <Button
        variant={scale === 1 ? "default" : "outline"}
        onClick={() => handleZoom(1)}
      >
        100%
      </Button>
    </div>
  );
});

export default ZoomToolbar;
