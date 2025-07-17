import { Button, Card } from "flowbite-react";

export function CartCard({
  title,
  img,
  rating,
  description,
  price,
  discPerc,
  id,
}) {
  return (
    <Card className="w-full lg:h-56 text-white">
      <div className="flex gap-4">
        <div>
          <img className="size-36" src={img} alt="" />
        </div>
        <div className="space-y-2">
          <h5 className="text-xl font-semibold tracking-tight ">{title}</h5>
          <p>{description}</p>
          <p>
            <span className="line-through">${price} </span>
            <span className="ml-2">
              ${Math.round(price - price / discPerc)}
            </span>
          </p>
          <div className="border space-x-3 w-fit border-gray-100 p-2 rounded-sm">
            <span className="cursor-pointer hover:opacity-65">-</span>
            <span>1</span>
            <span className="cursor-pointer hover:opacity-65">+</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
