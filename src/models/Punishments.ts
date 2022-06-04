export type PunishmentCategory = {
    short: string;
    name: string;
    deprecated: boolean;
    message: string;
    level: number;
    scale: Exclude<PunishmentAction, "KICK" | "WARN">;
    requiredRank?: Rank;
    ordinal: number;
    displayMaterial: string
}

export type PunishmentCategoryPatch = {
    short: string;
    name?: string;
    deprecated?: boolean;
    message?: string;
    level?: number;
    scale?: Exclude<PunishmentAction, "KICK" | "WARN">;
    requiredRank?: Rank;
    ordinal?: number;
    displayMaterial?: string
}

export enum Rank {
    ADMIN = "ADMIN",
    SR_MOD = "SR_MOD",
    MOD = "MOD",
    SUPER_HELPER = "SUPER_HELPER",
    HELPER = "HELPER"
}

export enum PunishmentAction {
    WARN = "WARN",
    KICK = "KICK",
    MUTE = "MUTE",
    BAN = "BAN",
    LOBBY_BAN = "LOBBY_BAN",
}