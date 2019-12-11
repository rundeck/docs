# Password Encrypt Utility Plugins

## About

Password Utility Plugin allows you defined custom password encrypter through the Password Utility GUI.
Then, using the GUI you will be able to encrypt password or text values with a custom encrypter that you determine.

## Use

Create a Password Utility Plugin and install it as a Rundeck Plugin.
You will need to implement the `PasswordUtilityEncrypterPlugin` interface. 

Then, on the `System > Password Utility` menu option.

You will see your plugin on the available encoders list

![Figure: Encoders List](~@assets/img/password-utility-plugin-list.png)

Select your plugin and the plugin's attributes will be displayed on the form.

![Figure: Encoders Form](~@assets/img/password-utility-plugin-form.png)

Finally, run the encryption

![Figure: Encoders Result](~@assets/img/password-utility-plugin-result.png)


## Java Plugin Type

```java
package com.plugin.example;

import com.dtolabs.rundeck.core.encrypter.EncryptorResponse;
import com.dtolabs.rundeck.core.encrypter.PasswordUtilityEncrypterPlugin;
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.core.plugins.configuration.*;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.descriptions.PluginDescription;
import com.dtolabs.rundeck.plugins.util.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Plugin(service = ServiceNameConstants.PasswordUtilityEncrypter, name ="MyPasswordEncrypterTest")
@PluginDescription(title = "MyPasswordEncrypterTest", description = "MyPasswordEncrypterTest")
/**
 * new MyPasswordEncrypterTest plugin, will provide the encrypt function on the rundeck GUI (Password Utility page)
 */
public class MyPasswordEncrypterTest implements PasswordUtilityEncrypterPlugin, Describable {

    static Description DESCRIPTION = DescriptionBuilder.builder()
            .name("MyPasswordEncrypterTest")
            .title("MyPasswordEncrypterTest")
            .description("MyPasswordEncrypterTest description")
            .property(PropertyUtil.string("value", "value", "value to encrypt", true, null))
            .build();


    @Override
    public Description getDescription() {
        return DESCRIPTION;
    }
    
    /**
     * will perform the encrypt process based on the parameters set on formProperties()
     * The {@link config} map of parametes passing form gue GUI.
     */
    @Override
    public EncryptorResponse encrypt(Map config) {

        EncryptorResponseImpl result = new EncryptorResponseImpl();

        try {
            //get the value set on the GUI form
            String valToEncrypt = (String) config.get("value");

            //my custom encripter (you will need to define your custom encryptor)
            CustomEncryptor encryptor = ...
            String encryptedValue = encryptor.encrypt(valToEncrypt);
            result.setValid(true);

            //this will be returned to the page, this map will be printed on the GUI
            Map<String, String> outputs = new HashMap();
            outputs.put("original", valToEncrypt);
            outputs.put("encrypted", "encryptedValue");
            result.setOuputs(outputs);

        }catch (Exception e){
            result.setValid(false);
            result.setError(e.getMessage());
        }

        return result;
    }

    class EncryptorResponseImpl implements EncryptorResponse{
        boolean isValid;
        String error;
        Map<String, String> ouputs;

        public void setValid(boolean valid) {
            isValid = valid;
        }

        public void setError(String error) {
            this.error = error;
        }

        public void setOuputs(Map<String, String> ouputs) {
            this.ouputs = ouputs;
        }

        @Override
        public boolean isValid() {
            return isValid;
        }

        @Override
        public String getError() {
            return error;
        }

        @Override
        public Map<String, String> getOutputs() {
            return ouputs;
        }

    }
}
```
