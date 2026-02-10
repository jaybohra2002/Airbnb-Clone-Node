import { Model, CreationAttributes, ModelStatic, WhereOptions } from "sequelize";

abstract class BaseRepository<T extends Model> {
    protected model: ModelStatic<T>;
    constructor(model: ModelStatic<T>) {
        this.model = model;
    }

    async create(data: CreationAttributes<T>): Promise<T> {
        const result = await this.model.create(data);
        return result;
    }

    async findAll(): Promise<T[]> {
        const result = await this.model.findAll({
           
        });
        return result;
    }

    async findById(id: number): Promise<T | null> {
        const result = await this.model.findByPk(id);
        return result;
    }

    async update(whereOptions: WhereOptions<T>, data: Partial<T>): Promise<[number]> {
        const result = await this.model.update(data, {
            where: {
                ...whereOptions
            }
        });
        return result;
    }

    async delete(whereOptions: WhereOptions<T>): Promise<void> {
        const record = await this.model.destroy({ where: whereOptions });
        if (!record) {
            throw new Error("Id not found");
        }
        return;
    }
}
export default BaseRepository;