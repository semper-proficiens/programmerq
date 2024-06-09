pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    sh 'cd react-app'
                    sh 'pwd'
                    sh 'ls -lahs'
                    sh 'make'
                }
            }
        }
    }
}