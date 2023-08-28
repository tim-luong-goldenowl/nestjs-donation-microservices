import { Column, Entity, Index, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';
import DonationReceiver from './donation-receiver.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('donation')
class DonationEntity {
    @Index()
    @PrimaryGeneratedColumn("uuid")
    public uid: string;

    @Column()
    public message: string;

    @Column()
    public value: number;

    @ManyToOne(() => User, (user) => user.donations)
    public user: User

    @ManyToOne(() => DonationReceiver, (donationReceiver) => donationReceiver.donations)
    public donationReceiver: DonationReceiver
}

export default DonationEntity;