// Shared wire format for the C8Oforms -> BaserowIntegration login bridge.
// Both Convertigo projects must receive the same independent 32-byte key.
var BASEROW_BRIDGE_AUDIENCE = "BaserowIntegration.CheckLogin";
var BASEROW_BRIDGE_AAD = "C8OFORMS_BASEROW_BRIDGE_V2";
var BASEROW_BRIDGE_TTL_MS = 5 * 60 * 1000;
var BASEROW_BRIDGE_CLOCK_SKEW_MS = 30 * 1000;

function baserowBridgeKey() {
	var symbols = com.twinsoft.convertigo.engine.Engine.theApp.databaseObjectsManager;
	var configured = symbols.symbolsGetValue("BaserowIntegration.bridge.key.secret");
	if (configured == null) {
		throw new Error("Baserow bridge key symbol is not configured");
	}
	try {
		// Compiled as a reference: a %ENV% value is resolved.
		configured = symbols.getCompiledValue("${BaserowIntegration.bridge.key.secret}");
	} catch (e) {
		// keep the raw value when it refers to an undefined symbol
	}
	var encoded = String(configured);
	if (!/^[A-Za-z0-9+/]{43}=$/.test(encoded)) {
		throw new Error("Baserow bridge key must be canonical Base64");
	}
	var key = java.util.Base64.getDecoder().decode(new java.lang.String(encoded));
	if (key.length !== 32 || String(java.util.Base64.getEncoder().encodeToString(key)) !== encoded) {
		throw new Error("Baserow bridge key must contain exactly 32 bytes");
	}
	return new javax.crypto.spec.SecretKeySpec(key, "AES");
}

function baserowBridgeValidTime(value) {
	return typeof value === "number" && isFinite(value) && value > 0 &&
		value <= 9007199254740991 && Math.floor(value) === value;
}

function baserowBridgeValidateClaims(claims, now) {
	if (claims == null || typeof claims !== "object" || claims instanceof Array ||
		claims.aud !== BASEROW_BRIDGE_AUDIENCE ||
		typeof claims.email !== "string" || claims.email.length < 1 || claims.email.length > 320 ||
		typeof claims.password !== "string" || claims.password.length < 1 || claims.password.length > 1024 ||
		!baserowBridgeValidTime(claims.iat) || !baserowBridgeValidTime(claims.exp) ||
		claims.exp <= claims.iat || claims.exp - claims.iat > BASEROW_BRIDGE_TTL_MS ||
		claims.iat > now + BASEROW_BRIDGE_CLOCK_SKEW_MS || claims.exp <= now) {
		throw new Error("Invalid Baserow bridge claims");
	}
	return claims;
}

function encodeBaserowBridgeToken(email, password) {
	var now = new Date().getTime();
	var claims = baserowBridgeValidateClaims({
		aud: BASEROW_BRIDGE_AUDIENCE,
		email: email,
		password: password,
		iat: now,
		exp: now + BASEROW_BRIDGE_TTL_MS
	}, now);
	var nonce = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 12);
	new java.security.SecureRandom().nextBytes(nonce);
	var cipher = javax.crypto.Cipher.getInstance("AES/GCM/NoPadding");
	cipher.init(javax.crypto.Cipher.ENCRYPT_MODE, baserowBridgeKey(),
		new javax.crypto.spec.GCMParameterSpec(128, nonce));
	cipher.updateAAD(new java.lang.String(BASEROW_BRIDGE_AAD).getBytes("UTF-8"));
	var ciphertext = cipher.doFinal(new java.lang.String(JSON.stringify(claims)).getBytes("UTF-8"));
	var envelope = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, nonce.length + ciphertext.length);
	java.lang.System.arraycopy(nonce, 0, envelope, 0, nonce.length);
	java.lang.System.arraycopy(ciphertext, 0, envelope, nonce.length, ciphertext.length);
	return "v2." + String(java.util.Base64.getUrlEncoder().withoutPadding().encodeToString(envelope));
}

function decodeBaserowBridgeToken(token) {
	var encodedToken = String(token);
	if (encodedToken.length > 8192 || !/^v2\.[A-Za-z0-9_-]+$/.test(encodedToken)) {
		throw new Error("Invalid Baserow bridge token version");
	}
	var payload = encodedToken.substring(3);
	var envelope = java.util.Base64.getUrlDecoder().decode(new java.lang.String(payload));
	if (envelope.length < 12 + 16 + 2 ||
		String(java.util.Base64.getUrlEncoder().withoutPadding().encodeToString(envelope)) !== payload) {
		throw new Error("Invalid Baserow bridge token encoding");
	}
	var nonce = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 12);
	var ciphertext = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, envelope.length - nonce.length);
	java.lang.System.arraycopy(envelope, 0, nonce, 0, nonce.length);
	java.lang.System.arraycopy(envelope, nonce.length, ciphertext, 0, ciphertext.length);
	var cipher = javax.crypto.Cipher.getInstance("AES/GCM/NoPadding");
	cipher.init(javax.crypto.Cipher.DECRYPT_MODE, baserowBridgeKey(),
		new javax.crypto.spec.GCMParameterSpec(128, nonce));
	cipher.updateAAD(new java.lang.String(BASEROW_BRIDGE_AAD).getBytes("UTF-8"));
	var plaintext = cipher.doFinal(ciphertext);
	var claims = JSON.parse(String(new java.lang.String(plaintext, "UTF-8")));
	return baserowBridgeValidateClaims(claims, new Date().getTime());
}

// Temporary compatibility with the hex token of older C8oForms (x-prefixed Crypto2 output of {email, password, ts}),
// accepted only when BaserowIntegration.bridge.acceptLegacy is true.
function decodeLegacyBaserowBridgeToken(token, acceptLegacy) {
	var legacyToken = String(token);
	if (acceptLegacy !== true || legacyToken.length < 3 || legacyToken.length > 8193 ||
		!/^x(?:[0-9a-fA-F]{2})+$/.test(legacyToken)) {
		throw new Error("Legacy Baserow bridge token is disabled or malformed");
	}
	var claims = JSON.parse(String(com.twinsoft.convertigo.engine.util.Crypto2.decodeFromHexString(legacyToken)));
	var now = new Date().getTime();
	if (claims == null || typeof claims !== "object" || claims instanceof Array ||
		typeof claims.email !== "string" || claims.email.length < 1 || claims.email.length > 320 ||
		typeof claims.password !== "string" || claims.password.length < 1 || claims.password.length > 1024 ||
		typeof claims.ts !== "number" || !isFinite(claims.ts) || Math.floor(claims.ts) !== claims.ts ||
		claims.ts < now - BASEROW_BRIDGE_TTL_MS || claims.ts > now + BASEROW_BRIDGE_TTL_MS) {
		throw new Error("Invalid legacy Baserow bridge claims");
	}
	return claims;
}
