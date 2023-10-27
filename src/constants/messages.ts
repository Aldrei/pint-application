const Messages = {
  pt: {
    properties: {
      store: {
        success: 'Imóvel adicionado com sucesso!',
        errorRequest: 'Erro ao adicionar o imóvel. Tente em breve!',
        errorRequired: 'Preencha os campos em destaque.',
      },
      update: {
        success: 'Imóvel atualizado com sucesso!',
        errorRequest: 'Erro ao atualizar o imóvel. Tente em breve!',
        errorRequired: 'Preencha os campos em destaque.',
      },
      photos: {
        store: {
          errorLimit: (limitDiff: number) => `50 fotos por imóvel, ${String(limitDiff)} restante para este imóvel.`
        },
        delete: {
          success: 'Foto deletada com sucesso!',
          errorRequest: 'Erro ao deletar foto. Tente em breve!',
        },
        update: {
          success: 'Imóvel atualizado com sucesso!',
          errorRequest: 'Erro ao atualizar o imóvel. Tente em breve!',
          errorRequired: 'Preencha os campos em destaque.',
        }
      },
      video: {
        store: {
          success: 'Vídeo adicionado com sucesso!',
          errorRequest: 'Erro ao adicionar vídeo. Tente em breve!',
        },
        delete: {
          success: 'Vídeo deletado com sucesso!',
          errorRequest: 'Erro ao deletar vídeo. Tente em breve!',
        },
      }
    },
    owners: {
      store: {
        success: 'Cliente cadastrado com sucesso!',
        errorRequest: 'Erro ao cadastrar o cliente. Tente em breve!',
        errorRequired: 'Preencha os campos em destaque.',
      },
      update: {
        success: 'Cliente atualizado com sucesso!',
        errorRequest: 'Erro ao atualizar o cliente. Tente em breve!',
        errorRequired: 'Preencha os campos em destaque.',
      },
    },
    banners: {
      store: {
        success: 'Banner cadastrado com sucesso!',
        errorRequest: 'Erro ao cadastrar o banner. Tente em breve!',
        errorRequired: 'Preencha os campos em destaque.',
      },
      update: {
        success: 'Banner atualizado com sucesso!',
        errorRequest: 'Erro ao atualizar o banner. Tente em breve!',
        errorRequired: 'Preencha os campos em destaque.',
      },
      delete: {
        success: 'Banner deletado com sucesso!',
        errorRequest: 'Erro ao deletar o banner. Tente em breve!',
        errorRequired: 'Preencha os campos em destaque.',
      },
    },
    generic: {
      store: {
        success: (model: string) => `${model} cadastrado(a) com sucesso!`,
        errorRequest: (model: string) => `Erro ao cadastrar o ${model}. Tente em breve!`,
        errorRequired: 'Preencha os campos em destaque.',
        errorLimit: (limitDiff: string) => `50 fotos por imóvel, ${String(limitDiff)} restante para este imóvel.`
      },
      update: {
        success: (model: string) => `${model} atualizado(a) com sucesso!`,
        errorRequest: (model: string) => `Erro ao atualizar o ${model}. Tente em breve!`,
        errorRequired: 'Preencha os campos em destaque.',
        errorLimit: (limitDiff: string) => `50 fotos por imóvel, ${String(limitDiff)} restante para este imóvel.`
      },
      delete: {
        success: (model: string) => `${model} deletado(a) com sucesso!`,
        errorRequest: (model: string) => `Erro ao deletar o ${model}. Tente em breve!`,
        errorRequired: 'Preencha os campos em destaque.',
        errorLimit: ''
      }
    }
  }
};

export default Messages;