import { atom } from "jotai";
import { InboxWithOverViewType } from "./types";

export const selectedInboxAtom = atom<InboxWithOverViewType | null>(null);

export const messageAtom = atom<string>("");
