import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';
import DonationReceiver from './donation-receiver.entity';

@Entity('donation')
class DonationEntity {
    @Index()
    @PrimaryGeneratedColumn("uuid")
    public uid: string

    @Column()
    public message: string

    @Column()
    public value: number

    @JoinColumn()
    userUid: string

    @JoinColumn()
    donationReceiverUid: string

    @ManyToOne(() => User, (user) => user.donations)
    public user: User

    @ManyToOne(() => DonationReceiver, (donationReceiver) => donationReceiver.donations)
    public donationReceiver: DonationReceiver
}

export default DonationEntity;