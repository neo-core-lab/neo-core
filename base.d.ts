// ======================================================================
// NEO UMBRELLA LICENSE — ADAPTER CONTRACT (IMMUTABLE SPEC)
// © 2023–2025 Luciana Fisher. All Rights Reserved.
//
// This file defines the mandatory Adapter API Spec v1.0.
// All platform adapters (IG, X, YouTube) MUST conform exactly.
// Modifications require Founder-Key approval and version bump.
//
// Prohibited: DOM access outside adapter boundaries, telemetry,
// storage, network transmission, or deviation from zero-log doctrine.
// ======================================================================


// base.d.ts — Adapter contract (immutable)

export interface AdapterPacket {
	comments: CommentNode[];
	meta: PageMeta;
	adapterInfo: AdapterInfo;
}

export interface CommentNode {
	id: string;
	text: string;
	author: string;
	timestamp: number;
	parentId: string | null;
	node: Element;
	platform: 'ig' | 'x' | 'yt';
	lang: string;
}

export interface PageMeta {
	url: string;
	platform: 'ig' | 'x' | 'yt';
	pageType: 'feed' | 'post' | 'replies' | 'live';
	userLoggedIn: boolean;
}

export interface AdapterInfo {
	name: string;
	version: string;
	adapterHash: string;
}

// Functional adapter contract (if you go function-style instead of class)
export interface FunctionalAdapter {
	init(): Promise<void>;
	watch(callback: (pkt: AdapterPacket) => void): void;
	stop(): void;
	restoreOriginal(id: string): void;
	getInfo(): AdapterInfo;
}
