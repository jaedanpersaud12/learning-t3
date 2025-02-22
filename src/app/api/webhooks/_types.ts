/* eslint-disable @typescript-eslint/no-explicit-any */
interface EmailAddress {
  email_address: string;
  id: string;
  linked_to: any[];
  object: string;
  reserved: boolean;
  verification: any;
}

interface ClerkWebhookEvent {
  data: {
    id: string;
    object: string;
    birthday: string;
    created_at: number;
    email_addresses: EmailAddress[];
    external_accounts: any[];
    external_id: string | null;
    first_name: string;
    gender: string;
    image_url: string;
    last_name: string | null;
    last_sign_in_at: number | null;
    password_enabled: boolean;
    phone_numbers: any[];
    primary_email_address_id: string;
    primary_phone_number_id: string | null;
    primary_web3_wallet_id: string | null;
    private_metadata: Record<string, unknown>;
    profile_image_url: string;
    public_metadata: Record<string, unknown>;
    two_factor_enabled: boolean;
    unsafe_metadata: Record<string, unknown>;
    updated_at: number;
    username: string | null;
    web3_wallets: any[];
  };
  object: string;
  type: string;
}

export type { ClerkWebhookEvent };
