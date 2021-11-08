### github actions:

* [ ] Verificar se tempo de pipeline está abaixo de 5 minutos
* [ ] Verificar se dependencias estão sendo instaladas desnecessariamente
* [ ] Verificar se está sendo utilizado cache
* [ ] Verificar se está sendo utilizado secrets
* [ ] Verificar se variáveis ​​de ambiente estão com o escopo mais estreito possível
* [ ] Verificar se não está sendo utilizado algum runner auto-hospedados em um repositório público
* [ ] Verificar se está sendo utilizado apenas actions certificados

### terraform:

* [ ] Use _ (sublinhado) em vez de - (traço) em todos: nomes de recursos, nomes de fontes de dados, nomes de variáveis, saídas
* [ ] Use apenas letras minúsculas e números
* [ ] Não repita o tipo de recurso no nome do recurso (nem parcialmente, nem completamente)
    * Bom: resource "aws_route_table" "public" {}
    * Ruim: resource "aws_route_table" "public_route_table" {}
    * Ruim: resource "aws_route_table" "public_aws_route_table" {}
* [ ] Sempre use substantivos singulares para nomes
* [ ] Inclua o argumento de contagem dentro dos blocos de recursos como o primeiro argumento no topo e separe por nova linha depois dele. Veja o exemplo
    * https://www.terraform-best-practices.com/naming#usage-of-count
* [ ] Incluir argumento de tags, se suportado por recurso como o último argumento real, seguido por depends_on e lifecycle, se necessário. Todos eles devem ser separados por uma única linha vazia. consultar exemplo
    * https://www.terraform-best-practices.com/naming#placement-of-tags
* [ ] Ao usar condição no argumento de contagem, use o valor booleano, se fizer sentido; caso contrário, use o comprimento ou outra interpolação. consultar exemplo
    * https://www.terraform-best-practices.com/naming#conditions-in-count
* [ ] Para fazer com que as condições invertidas não introduzam outra variável, a menos que seja realmente necessário, use 1 - valor booleano. Por exemplo
    * count = "${1 - var.create_public_subnets}"
* [ ] Use arquivos variáveis .tfvars
* [ ] Use a variável própria Por exemplo
    * self.ipv4_address
* [ ] Especifique valores booleanos como variáveis ​​de string
* [ ] Utilziar funções integradas do terraform
* [ ] Formatar arquivos Terraform automaticamente terraform fmt -diff

## docker:

* [ ] Verificar se o container é efemero
* [ ] Verificar se está sendo enviado apenas os arquivos necessários para o build .dockerignore
* [ ] Verificar se não está sendo instalado pacotes desnecessários
* [ ] Verificar se os containers estão desacoplados
* [ ] Classificar argumentos de várias linhas (\)
    * RUN apt-get update && apt-get install -y \ 
    * bzr \
    * cvs \
* [ ] Verificar se está utilizando multi-stage build
    * Exemplo: https://docs.docker.com/develop/develop-images/multistage-build/
* [ ] Verificar vulnerabilidades  da imagem executando docker scan <image-name>
* [ ] Evite utilizar tags mutantes
    * Exemplo: https://sysdig.com/blog/toctou-tag-mutability/
* [ ] Inclui verificações de saúde
    * Exemplo: https://docs.docker.com/engine/reference/builder/#healthcheck
* [ ] Executar container como não root, comando USER no Dockerfile
* [ ] Assinar imagens e verificar assinaturas
    * Exemplo: https://docs.docker.com/engine/security/trust/
* [ ] Verificar se o Dockerfile não está passando nenhuma credencial ou informação sensivel
* [ ] Priorize utilizar o comando COPY ao ADD

## node:

* [ ] Estruture sua solução por componentes independentes e não agrupe por função técnica
* [ ] Coloque seus componentes em camadas, dominio, caso de uso, infra
* [ ] Mantenha a configuração do aplicativo separados
* [ ] Configurar arquivos utilizando a lib config
* [ ] Use Async-Await ou promessas para tratamento de erros assíncronos
```javascript
async function executeAsyncTask () {
  try {
    const valueA = await functionA();
    const valueB = await functionB(valueA);
    const valueC = await functionC(valueB);
    return await functionD(valueC);
  }
  catch (err) {
    logger.error(err);
  } finally {
    await alwaysExecuteThisFunction();
  }
}
```
* [ ] Lance erros utilizando o Error embutido (@typescript-eslint/no-throw-literal)
```javascript
throw  new  Error ( 'Lançando erro' ) ;
```
* [ ] Distinguir erros operacionais de erros dos programado, de reiniciar app no caso de erro do programador
```javascript
export class AppError extends Error {
  public readonly commonType: string;
  public readonly isOperational: boolean;

  constructor(commonType: string, description: string, isOperational: boolean) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.commonType = commonType;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

throw new AppError(errorManagement.commonErrors.InvalidInput, 'Describe', true);
```
* [ ] Implementar log de erros (Prometheus , CloudWatch , DataDog e Sentry)
* [ ] Trate os erros de maneira centralizada. Não utilizando middlewares
```javascript
class ErrorHandler {
  public async handleError(error: Error, responseStream: Response): Promise<void> {
    await logger.logError(error);
    await fireMonitoringMetric(error);
    await crashIfUntrustedErrorOrSendResponse(error, responseStream);
  };
}

export const handler = new ErrorHandler();
```
https://github.com/goldbergyoni/nodebestpractices
https://medium.com/@warkiringoda/typescript-best-practices-2021-a58aee199661
https://ahorasomos.izertis.com/solidgear/en/nestjs-your-nodejs-empowered-with-best-practices/

