export default interface ITask {
  id: number;
  titulo: string;
  descricao?: string | null;
  status: string;
  dataCriacao: Date;
  dataConclusao?: Date | null;
}
