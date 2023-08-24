import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';
import DonationReceiver from './donation-receiver.entity';

@Entity()
class Donation {
    @Index()
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public message: string;

    @Column()
    public value: number;

    @ManyToOne(() => User, (user) => user.donations)
    public user: User

    @ManyToOne(() => DonationReceiver, (donationReceiver) => donationReceiver.donations)
    public donationReceiver: DonationReceiver
}

export default Donation;