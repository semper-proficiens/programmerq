pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    // Print the current working directory
                    sh 'pwd'
                    sh 'ls -lahs'

                    // Run the make command
                    sh 'make'
                }
            }
        }
    }
}