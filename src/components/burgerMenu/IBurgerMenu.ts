import { UserMetadata } from "@supabase/supabase-js";

export interface IBurgerMenu {
    localUser: UserMetadata;
    logout: () => Promise<void>;
}