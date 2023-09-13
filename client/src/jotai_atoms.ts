import { atom } from "jotai";
import {
  ConnectedInboxWithOverview,
  NonConnectedInboxWithOverviewType,
} from "./types";
import { Socket } from "socket.io-client";

export const selectedInboxAtom = atom<
  ConnectedInboxWithOverview | NonConnectedInboxWithOverviewType | null
>(null);

export const messageAtom = atom<string>("");

export const searchTermAtom = atom<HTMLInputElement | null>(null);

export const isSearchListAtom = atom<boolean>(false);

export const connectedInboxesAtom = atom<ConnectedInboxWithOverview[]>([]);

export const searchNonConnectedUsersAtom = atom<boolean>(false);

export const primarySocketAtom = atom<Socket | null>(null);
