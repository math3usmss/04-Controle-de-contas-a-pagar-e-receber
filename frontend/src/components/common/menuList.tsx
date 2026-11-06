import { Ellipsis } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuListProps {
  editComponent?: ReactNode;
  deleteComponent?: ReactNode;
  onEdit?: () => void;
}

export default function MenuList({
  editComponent,
  deleteComponent,
  onEdit,
}: MenuListProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Ellipsis className="size-5" />
            </Button>
          }
        />

        <DropdownMenuContent align="end" className="w-40">
          {onEdit && (
            <DropdownMenuItem
              onClick={onEdit}
              className="cursor-pointer justify-center"
            >
              Editar
            </DropdownMenuItem>
          )}

          {deleteComponent && deleteComponent}
        </DropdownMenuContent>
      </DropdownMenu>

      {editComponent}
    </>
  );
}
