node {
    def REPO_URL = 'https://github.com/EduardoMartinezCalatayud/proyecto-prueba-tecnica.git'
    def BRANCH = 'develop'
    def ANGULAR_ENV = 'production'
    def BUILD_FOLDER = 'dist/proyecto-prueba-tecnica/browser'
    def DEPLOY_PATH = '/var/www/dev/prueba-tecnica'

    stage('Preparar entorno') {
        deleteDir()
        git url: REPO_URL, branch: BRANCH
    }

    stage('Instalar dependencias') {
        sh 'npm install'
    }

    stage("Compilar Angular (${ANGULAR_ENV})") {
        sh "npx ng build --configuration=${ANGULAR_ENV}"
    }

    stage('Verificar build') {
        sh 'ls -la dist'
        sh 'ls -la dist/proyecto-prueba-tecnica'
    }

    stage('Desplegar') {
        sh """
            rm -rf ${DEPLOY_PATH}/*
            cp -a ${BUILD_FOLDER}/. ${DEPLOY_PATH}/
            chmod -R 755 ${DEPLOY_PATH}
        """
    }

    echo 'Despliegue completado exitosamente.'
}
