import { RoleEntity } from 'src/roles/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => RoleEntity, (role) => role.user, {
    cascade: true,
    eager: true,
  })
  roles: RoleEntity[];
}
