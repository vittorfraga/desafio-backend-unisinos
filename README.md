## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível que os administradores criem turmas especificando disciplinas, horários, e professores;
- [ ] Deve permitir que os alunos se matriculem em turmas disponíveis;
- [ ] Deve ser possível que os alunos solicitem cancelamento de matrícula dentro de um prazo estabelecido;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O mesmo professor nao deve ser alocado em turmas diferentes no mesmo horário;
- [ ] O aluno nao deve poder se matricular em duas turmas no mesmo horário;
- [x] Somente administradores devem poder criar e gerenciar turmas;
- [ ] As turmas devem ser compostas por: alunos, professor e uma disciplina;
- [x] As turmas devem ser ofertadas num horário/turno e dia da semana;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco de dados relacional;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
