import { MyPrismaClient } from '../../../../config/PrismaClientConfig'
import { SessionAuthDTO } from '../../dtos/SessionAuthDTO'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { AuthResponseDTO } from '../../dtos/AuthResponseDTO'
import authConfig from '../../../../config/AuthConfig'

export class SessionAuthUseCase {
  async execute({ email, password }: SessionAuthDTO): Promise<AuthResponseDTO> {
    // Verificar se o email já existe

    // Busca usuário no banco de dados
    const userSearched = await MyPrismaClient.user.findUnique({
      where: {
        email,
      },
    })

    if (!userSearched) {
      throw new Error('Wrong e-mail or password.')
    }

    // Comparando a senha

    const passwordMatched = await compare(password, userSearched.password)

    if (!passwordMatched) {
      throw new Error('Wrong e-mail or password.')
    }

    // Se tudo certo, ele irá retorar o usuário e o token JWT

    // Aqui eu usei um hash md5, que deve ser escondido depois.
    // O JWT irá comparar se o token enviado, foi relamente gerado por essa hash
    // Por isso essa hash é muito importante e deve ser escondida!
    // const token = sign({}, 'dcff1efbc16a5db3abf677b46bb58892', {
    //   subject: userSearched.id,
    //   expiresIn: '1d',
    // });

    const token = sign({}, authConfig.jwt.secret, {
      subject: userSearched.id,
      expiresIn: authConfig.jwt.expiresIn,
    })

    // delete userSearched.password // Apagamos a hash de senha do json

    return {
      token,
      user: {
        name: userSearched.name,
        email: userSearched.email,
      },
    }
  }
}
