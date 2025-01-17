type RSS3ID = string;
type RSS3ItemID = string;
type RSS3ItemsID = string;
type RSS3ListID = string;
type ThirdPartyAddress = string[];

type RSS3IContent = RSS3Index | RSS3Items;
type RSS3Content = RSS3IContent | RSS3List;

// Common attributes for each files
interface RSS3Base {
    id: RSS3ID | RSS3ItemsID | RSS3ListID;
    '@version': string;
    date_created: string;
    date_updated: string;
}

// Entrance, RSS3 file
interface RSS3Index extends RSS3Base {
    id: RSS3ID;
    signature: string;

    agent_id?: string;
    agent_signature?: string;

    owers?: RSS3ID[];

    profile?: RSS3Profile;

    items?: RSS3Item[];
    items_next?: RSS3ItemsID;

    links?: RSS3Links[];
    '@backlinks'?: RSS3Backlink[];

    accounts?: RSS3Account[];

    assets?: RSS3Asset[];
}

interface RSS3Backlink {
    type: string;
    list: RSS3ListID;
}

// RSS3Items file
interface RSS3Items extends RSS3Base {
    id: RSS3ItemsID;

    items: RSS3Item[];
    items_next?: RSS3ItemsID;
}

// RSS3List file
interface RSS3List extends RSS3Base {
    id: RSS3ListID;

    list?: RSS3ID[] | RSS3ItemID[];
    list_next?: RSS3ListID;
}

export interface RSS3ItemInput {
    id?: string;
    date_published?: string;
    authors?: RSS3ID[];
    title?: string;
    summary?: string;
    tags?: string[];

    type?: string;
    upstream?: RSS3ItemID;

    contents?: {
        address: ThirdPartyAddress;
        mime_type: string;
        name?: string;
        tags?: string[];
        size_in_bytes?: string;
        duration_in_seconds?: string;
    }[];
}

export interface RSS3Item extends RSS3ItemInput {
    id: RSS3ItemID;
    date_modified?: string;

    '@contexts'?: {
        type?: string;
        list: RSS3ListID;
    }[];
}

export interface RSS3Profile {
    name?: string;
    avatar?: ThirdPartyAddress;
    bio?: string;
    tags?: string[];
}

export interface RSS3Links {
    type: string;
    tags?: string[];
    list?: RSS3ID[];
}

export interface RSS3Account {
    tags?: string[];
    platform: string;
    identity: string;
    signature?: string;
}

export interface RSS3Asset {
    tags?: string[];
    platform: string;
    identity: string;
    id: string;
    type?: string;
}
