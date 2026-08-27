"use client";

import { deleteMailingListAction } from "@/app/backoffice/actions";

type Props = {
  listId: string;
  listName: string;
};

export function DeleteMailingListButton({ listId, listName }: Props) {
  return (
    <form
      action={deleteMailingListAction}
      onSubmit={(e) => {
        const ok = window.confirm(
          `Supprimer la liste « ${listName} » ?\nLes membres de la liste seront aussi retirés.`,
        );
        if (!ok) e.preventDefault();
      }}
    >
      <input type="hidden" name="list_id" value={listId} />
      <button type="submit" className="text-xs text-red-700 hover:underline">
        Supprimer
      </button>
    </form>
  );
}
