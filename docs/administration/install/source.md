# Installing from Source

Compiling Rundeck from source is an advanced and customizable approach that allows users to have full control over the installation and configuration process of this powerful workflow automation platform. By compiling Rundeck from its source code, users gain the flexibility to tailor the installation to their specific requirements and leverage the latest features and updates directly from the development repository. Whether you're a developer looking to contribute to the project or an advanced user seeking a more hands-on deployment method, compiling Rundeck from source provides a deeper understanding of the platform's internals and empowers you to customize and optimize it for your specific use cases. In this guide, we will explore the step-by-step process of compiling Rundeck from source, ensuring you have the necessary tools, dependencies, and knowledge to successfully build and deploy a personalized instance of Rundeck.

## Installing from Source

Checkout the sources from [GitHub](https://github.com/rundeck/rundeck)

You can build either the executable war (self-running archive), or a RPM/Deb.

    ./gradlew build

Creates artifacts:

- `rundeckapp/build/libs/rundeck-X.Y.war`

Build the RPM (requires `rpm` command):

    make rpm

Build the DEB (requires `dpkg` command):

    make deb

To build clean:

    make clean

## Documentation

The documentation is in a separate repo: <https://github.com/rundeck/docs>.

Once you check out the documentation source, documentation can be built using: `make`.

Documentation build requires [pandoc](https://pandoc.org/) and [groovy](http://groovy-lang.org/).
