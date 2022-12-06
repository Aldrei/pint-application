export const messages = {
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
      }
    }
  }
};
