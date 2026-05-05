# Storage Converter Plugins

## Overview

Storage Converter plugins transform data as it's written to or read from [Key Storage](/manual/key-storage/index.md). The most common use is **encryption** - automatically encrypting secrets (passwords, API keys, certificates) before storage and decrypting when retrieved.

**What They Do:**

- **Encrypt/Decrypt** - Secure sensitive data at rest
- **Transform** - Modify content during read/write
- **Compress** - Reduce storage size
- **Hash/Sign** - Add cryptographic verification
- **Modify Metadata** - Update storage properties

**Why They Matter:**

Key Storage holds your most sensitive data:
- Database passwords
- API tokens and keys
- SSH private keys
- Cloud provider credentials
- Certificate files

Storage converters ensure this data is **encrypted at rest**, even if someone gains access to the underlying storage backend.

**Common Use Cases:**

**Encryption (Most Common):**
- **AES Encryption** - Encrypt all keys with AES-256
- **Master Key Encryption** - Encrypt with master password
- **KMS Integration** - Use AWS KMS, Azure Key Vault, HashiCorp Vault
- **Per-Key Encryption** - Different encryption key per secret

**Compliance:**
- **FIPS 140-2** - Use FIPS-approved encryption
- **Audit Logging** - Log all access to secrets
- **Key Rotation** - Automatically re-encrypt with new keys
- **PCI DSS** - Meet payment card compliance

**Advanced:**
- **Compression** - Compress large certificate files
- **Signing** - Add digital signatures
- **Versioning** - Track changes to secrets
- **Replication** - Sync to multiple backends

**Real-World Examples:**
- **Financial Company**: AES-256 encrypts all passwords, KMS manages encryption keys, meets SOC 2 requirements
- **Healthcare Provider**: FIPS-approved encryption for HIPAA compliance, audit log every access
- **SaaS Startup**: AWS KMS integration, automatic key rotation every 90 days
- **Enterprise**: Master password encryption, secrets encrypted before backup to S3

**Built-in Encryption:**

Rundeck includes:
- **AES-GCM Encryption** - AES-256-GCM authenticated encryption with master password
- Configured via `framework.properties`

Create custom plugins for:
- Cloud KMS integration
- Custom encryption algorithms
- Hardware security modules (HSM)
- Specialized compliance requirements

## Configuring

See: [Configuring the Storage Converter Plugin](/manual/key-storage/index.md#configuring-storage-converter-plugins).

## Java Plugin Implementation

Implement [StorageConverterPlugin]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/storage/StorageConverterPlugin.html):

```java
public interface StorageConverterPlugin {
    HasInputStream readResource(Path path, ResourceMetaBuilder meta, HasInputStream input);
    HasInputStream createResource(Path path, ResourceMetaBuilder meta, HasInputStream input);
    HasInputStream updateResource(Path path, ResourceMetaBuilder meta, HasInputStream input);
}
```

See also: [rundeck-storage-api]({{$javaDocStorageApiBase}})

### Complete Example: AES Encryption

```java
package com.example.rundeck.storage;

import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.core.storage.ResourceMetaBuilder;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.descriptions.*;
import com.dtolabs.rundeck.plugins.storage.StorageConverterPlugin;
import org.rundeck.storage.api.*;

import javax.crypto.*;
import javax.crypto.spec.*;
import java.io.*;
import java.security.*;
import java.util.Base64;

@Plugin(name = "aes-encryption", service = ServiceNameConstants.StorageConverter)
@PluginDescription(
    title = "AES Encryption",
    description = "Encrypts key storage data with AES-256"
)
public class AesEncryptionPlugin implements StorageConverterPlugin {
    
    @PluginProperty(
        title = "Master Password",
        description = "Master password for encryption",
        required = true
    )
    @RenderingOption(key = "displayType", value = "PASSWORD")
    private String masterPassword;
    
    private static final String ALGORITHM = "AES/CBC/PKCS5Padding";
    private static final String ENCRYPTED_META = "aes-encrypted";
    private static final String IV_META = "aes-iv";
    
    @Override
    public HasInputStream readResource(Path path, ResourceMetaBuilder meta,
                                      HasInputStream input) {
        // Check if encrypted
        if (!"true".equals(meta.getResourceMeta().getMeta().get(ENCRYPTED_META))) {
            return null;  // Not encrypted, no change
        }
        
        try {
            // Get IV from metadata
            String ivBase64 = meta.getResourceMeta().getMeta().get(IV_META);
            byte[] iv = Base64.getDecoder().decode(ivBase64);
            
            // Decrypt
            byte[] encryptedData = input.getInputStream().readAllBytes();
            byte[] decryptedData = decrypt(encryptedData, iv);
            
            // Return decrypted data
            return new ByteArrayInputStream(decryptedData)::getInputStream;
            
        } catch (Exception e) {
            throw new RuntimeException("Decryption failed: " + e.getMessage(), e);
        }
    }
    
    @Override
    public HasInputStream createResource(Path path, ResourceMetaBuilder meta,
                                        HasInputStream input) {
        return encryptResource(path, meta, input);
    }
    
    @Override
    public HasInputStream updateResource(Path path, ResourceMetaBuilder meta,
                                        HasInputStream input) {
        return encryptResource(path, meta, input);
    }
    
    private HasInputStream encryptResource(Path path, ResourceMetaBuilder meta,
                                          HasInputStream input) {
        try {
            // Read original data
            byte[] originalData = input.getInputStream().readAllBytes();
            
            // Generate IV
            byte[] iv = generateIV();
            
            // Encrypt
            byte[] encryptedData = encrypt(originalData, iv);
            
            // Add metadata
            meta.setMeta(ENCRYPTED_META, "true");
            meta.setMeta(IV_META, Base64.getEncoder().encodeToString(iv));
            
            // Return encrypted data
            return () -> new ByteArrayInputStream(encryptedData);
            
        } catch (Exception e) {
            throw new RuntimeException("Encryption failed: " + e.getMessage(), e);
        }
    }
    
    private byte[] encrypt(byte[] data, byte[] iv) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        SecretKeySpec keySpec = new SecretKeySpec(deriveKey(), "AES");
        IvParameterSpec ivSpec = new IvParameterSpec(iv);
        cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivSpec);
        return cipher.doFinal(data);
    }
    
    private byte[] decrypt(byte[] data, byte[] iv) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        SecretKeySpec keySpec = new SecretKeySpec(deriveKey(), "AES");
        IvParameterSpec ivSpec = new IvParameterSpec(iv);
        cipher.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);
        return cipher.doFinal(data);
    }
    
    private byte[] deriveKey() throws Exception {
        // Derive 256-bit key from password
        MessageDigest sha = MessageDigest.getInstance("SHA-256");
        return sha.digest(masterPassword.getBytes("UTF-8"));
    }
    
    private byte[] generateIV() {
        byte[] iv = new byte[16];
        new SecureRandom().nextBytes(iv);
        return iv;
    }
}
```

## Best Practices

### 1. Use Strong Encryption

```java
// Good: AES-256 with CBC mode
Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
SecretKeySpec keySpec = new SecretKeySpec(key256bit, "AES");

// Bad: Weak or deprecated
// Cipher cipher = Cipher.getInstance("DES");  // NO!
```

### 2. Store IV in Metadata

```java
// Generate random IV for each encryption
byte[] iv = new byte[16];
new SecureRandom().nextBytes(iv);

// Store IV with encrypted data (not secret)
meta.setMeta("encryption-iv", Base64.getEncoder().encodeToString(iv));
```

### 3. Handle Unencrypted Data

```java
// Check if already encrypted
if (meta.getMeta().containsKey("encrypted")) {
    return null;  // Already processed
}
```

### 4. Use Key Derivation

```java
// Don't use password directly as key
// Derive key using PBKDF2
SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
KeySpec spec = new PBEKeySpec(
    masterPassword.toCharArray(),
    salt,
    65536,  // iterations
    256     // key length
);
SecretKey key = factory.generateSecret(spec);
```

## Configuration

See [Configuring Storage Converter Plugins](/manual/key-storage/index.md#configuring-storage-converter-plugins).

## Related Documentation

- [Key Storage](/manual/key-storage/index.md) - Overview of Key Storage
- [Key Storage API](/api/index.md#key-storage) - API reference
- [Java Plugin Development](/developer/java-plugin-development.md) - General guide
ENDOFFILE


## Example

Example code under the `examples/` directory:

- `example-java-storage-converter-plugin`
